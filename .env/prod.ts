export default {
  mijin: {
    system: {
      dir: '/mnt/mijin',
      toolRepository: 'techbureauhd/catapult-server:mijin-1.0.3.5',
      unixUser: 'catapult',
      catapultLibraryPath: '/usr/catapult/lib:/usr/catapult/deps',
    },
    cert: {
      conmmonName: 'mijin.internal',
      days: 3650,
      private_key: 'ca.key.pem',
      certificate: 'ca.cert.pem',
      algorithm: 'ed25519',
      keySize: 1024,
    },
    voting: {
      startEpoch: 1,
      endEpoch: 26280,
      votingSetGroup: 160,
    },
  },
}
