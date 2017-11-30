
const { Etcd3 } = require('etcd3');
const client = new Etcd3({ hosts: '127.0.0.1:4001' });

// client.watch()
//     .prefix('f')
//     .create()
//     .then(watcher => {
//         watcher
//             .on('disconnected', () => console.log('disconnected...'))
//             .on('connected', () => console.log('successfully reconnected!'))
//             .on('put', res => console.log('foo got set to:', res.value.toString()))
//     });


// client.put('foo1').value('bar2')
//     .then(() => client.get('foo').string())
//     .then(value => console.log('foo was:', value))
//     .then(() => client.getAll().prefix('f').strings())
//     .then(keys => console.log('all our keys starting with "f":', keys))
//     //.then(() => client.delete().all())
//     .catch(e => console.log(e))



// let a = client.getAll().prefix('/d').then(k => {
//     console.log(k);
// });




// let testLease = () => {
//     const lease = client.lease(1);
//     lease.on('lost', err => {
//         console.log('We lost our lease as a result of this error:', err);
//         console.log('Trying to re-grant it...');
//         // grantLease();
//     })
//     lease.on("keepaliveFired", d => console.log(`keepaliveFired: ${d}`))
//     lease.on("keepaliveSucceeded", d => console.log(`keepaliveSucceeded: ${JSON.stringify(d)}`))
//     lease.on("keepaliveFailed", d => console.log(`keepaliveFailed: ${d}`))
//     lease.on("keepaliveEstablished", d => console.log(`keepaliveEstablished: ${d}`))
//     client.watch()
//         .prefix('/bla/bla')
//         .create()
//         .then(watcher => {
//             watcher
//                 .on('disconnected', () => console.log('disconnected...'))
//                 .on('connected', () => console.log('successfully reconnected!'))
//                 .on('put', res => console.log('testLease:connected'))
//                 .on('delete', res => console.log('testLease:delete'))
//                 .on('data', res => console.log('testLease:data '))

//         });
//     lease.put('/bla/bla').value('bla');


// }
//testLease();

waitOnce = async () => {
    const lease = client.lease(10);
    client.watch()
        .prefix('leased1')
        .create()
        .then(watcher => {
            watcher
                .on('disconnected', () => console.log('disconnected...'))
                .on('connected', () => console.log('successfully reconnected!'))
                .on('put', res => console.log('testLease:', res.value.toString()))
                .on('delete', res => console.log('testLease:', res.value.toString()))
                .on('data', res => console.log('testLease:', res))

        });
    lease.on('lost', err => {
        console.log('We lost our lease as a result of this error:', err);
        console.log('Trying to re-grant it...');
        // grantLease();
    })
    await lease.put('leased1').value('foo');
    await lease.keepaliveOnce();
}

waitOnce();
waitForLeaseToBeLost = () => {
    const lease = client.lease(1000);
    lease.on('lost', err => {
        console.log('We lost our lease as a result of this error:', err);
        console.log('Trying to re-grant it...');
        // grantLease();
    })
    lease.on("keepaliveFired", d => console.log(`keepaliveFired: ${d}`))
    lease.on("keepaliveSucceeded", d => console.log(`keepaliveSucceeded: ${d}`))
    lease.on("keepaliveFailed", d => console.log(`keepaliveFailed: ${d}`))
    lease.on("keepaliveEstablished", d => console.log(`keepaliveEstablished: ${d}`))
    client.watch()
        .prefix('/bla/bla')
        .create()
        .then(watcher => {
            watcher
                .on('disconnected', () => console.log('disconnected...'))
                .on('connected', () => console.log('successfully reconnected!'))
                .on('put', res => console.log('testLease:', res.value.toString()))
                .on('delete', res => console.log('testLease:', res.value.toString()))
                .on('data', res => console.log('testLease:', res.value.toString()))

        });
    lease.put('/bla/bla').value('bla');


}
