const { Etcd3 } = require('etcd3');
const client = new Etcd3({ hosts: '127.0.0.1:4001' });
const waitForRelease = () => {
    client.watch()
        .prefix('leased1')
        .create()
        .then(watcher => {
            watcher
                .on('disconnected', () => console.log('disconnected...'))
                .on('connected', () => console.log('successfully reconnected!'))
                .on('put', res => console.log('testLease:connected'))
                .on('delete', res => console.log('testLease:delete'))
                .on('data', res => console.log(`testLease:data ${JSON.stringify(res)}`))

        });


}

waitForRelease();