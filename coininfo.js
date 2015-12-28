(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
CoinInfo = require('coininfo');

},{"coininfo":2}],2:[function(require,module,exports){
// annoyingly, this is for browserify
var coins = [
  require('./coins/blk'),
  require('./coins/btc'),
  require('./coins/dash'),
  require('./coins/doge'),
  require('./coins/gmc'),
  require('./coins/ltc'),
  require('./coins/mue'),
  require('./coins/nmc'),
  require('./coins/ppc'),
  require('./coins/rdd'),
  require('./coins/uro')
]

var supportedCoins = {}

coins.forEach(function (coin) {
  var unit = coin.main.unit.toLowerCase()
  var name = coin.main.name.toLowerCase()

  supportedCoins[unit] = coin.main
  supportedCoins[name] = coin.main
  if (coin.test) {
    supportedCoins[unit + '-test'] = coin.test
    supportedCoins[name + '-test'] = coin.test
  }
})

function coininfo (input) {
  var coin = input.toLowerCase()

  if (!(coin in supportedCoins)) {
    return null
  } else {
    return supportedCoins[coin]
  }
}

coins.forEach(function (coin) {
  coininfo[coin.main.name.toLowerCase()] = coin
})

module.exports = coininfo

},{"./coins/blk":3,"./coins/btc":4,"./coins/dash":5,"./coins/doge":6,"./coins/gmc":7,"./coins/ltc":8,"./coins/mue":9,"./coins/nmc":10,"./coins/ppc":11,"./coins/rdd":12,"./coins/uro":13}],3:[function(require,module,exports){
/*
  info from:
    https://github.com/rat4/blackcoin/blob/master/src/chainparams.cpp
*/

var util = require('../util')

var common = {
  name: 'BlackCoin',
  per1: 1e8,
  unit: 'BLK'
}

var main = util.assign({
  port: 15714,
  portRpc: 15715,
  protocol: {
    magic: 0x05223570 // careful, sent over wire as little endian
  },
  seedsDns: [
    'rat4.blackcoin.co',
    'seed.blackcoin.co',
    'archon.darkfox.id.au',
    'foxy.seeds.darkfox.id.au',
    '6.syllabear.us.to',
    'bcseed.syllabear.us.to'
  ],
  versions: {
    bip32: {
      private: 0x0488ade4,
      public: 0x0488b21e
    },
    // http://doc.satoshilabs.com/slips/slip-0044.html
    bip44: 0xa,
    private: 0x99,
    public: 0x19,
    scripthash: 0x55
  }
}, common)

module.exports = {
  main: main,
  test: null
}

},{"../util":14}],4:[function(require,module,exports){
/*
  info from:
    https://github.com/bitcoin/bitcoin/blob/master/src/chainparams.cpp
*/

var util = require('../util')

var common = {
  name: 'Bitcoin',
  per1: 1e8,
  unit: 'BTC'
}

var main = util.assign({
  // nDefaultPort
  port: 8333,
  portRpc: 8334,
  protocol: {
    // pchMessageStart
    magic: 0xd9b4bef9 // careful, sent over wire as little endian
  },
  // vSeeds
  seedsDns: [
    'seed.bitcoin.sipa.be',
    'dnsseed.bluematt.me',
    'dnsseed.bitcoin.dashjr.org',
    'seed.bitcoinstats.com',
    'seed.bitnodes.io',
    'bitseed.xf2.org',
    'seeds.bitcoin.open-nodes.org'
  ],
  // base58Prefixes
  versions: {
    bip32: {
      private: 0x0488ade4,
      public: 0x0488b21e
    },
    // http://doc.satoshilabs.com/slips/slip-0044.html
    bip44: 0,
    private: 0x80,
    public: 0x00,
    scripthash: 0x05
  }
}, common)

var test = util.assign({
  port: 18333,
  portRpc: 18334,
  protocol: {
    magic: 0x0709110b
  },
  seedsDns: [
    'testnet-seed.alexykot.me',
    'testnet-seed.bitcoin.schildbach.de',
    'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me'
  ],
  versions: {
    bip32: {
      private: 0x04358394,
      public: 0x043587cf
    },
    bip44: 1,
    private: 0xef,
    public: 0x6f,
    scripthash: 0xc4
  }
}, common)

module.exports = {
  main: main,
  test: test
}

},{"../util":14}],5:[function(require,module,exports){
/*
  info from:
    https://github.com/dashpay/dash/blob/master/src/chainparams.cpp
*/

var util = require('../util')

var common = {
  name: 'Dash',
  unit: 'DASH'
}

var main = util.assign({
  // nDefaultPort
  port: 9999,
  portRpc: 9998,
  // vSeeds
  seedsDns: [
    'darkcoin.io',
    'dnsseed.darkcoin.io',
    'darkcoin.qa',
    'dnsseed.darkcoin.qa',
    'masternode.io',
    'dnsseed.masternode.io',
    'dashpay.io',
    'dnsseed.dashpay.io'
  ],
  // base58Prefixes
  versions: {
    bip32: {
      private: 0x02FE52CC,
      public: 0x02FE52F8
    },
    bip44: 5,
    private: 204,
    public: 76,
    scripthash: 16
  }
}, common)

var test = util.assign({
  port: 19999,
  portRpc: 19998,
  seedsDns: [
    'darkcoin.io',
    'testnet-seed.darkcoin.io',
    'darkcoin.qa',
    'testnet-seed.darkcoin.qa',
    'masternode.io',
    'test.dnsseed.masternode.io'
  ],
  versions: {
    bip32: {
      private: 0x04358394,
      public: 0x043587cf
    },
    bip44: 1,
    private: 0x3a8058037,
    public: 0x3a8061a0,
    scripthash: 0xc4
  }
}, common)

module.exports = {
  main: main,
  test: test
}

},{"../util":14}],6:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'Dogecoin',
  unit: 'DOGE'
}

var main = util.assign({
  versions: {
    bip32: {
      private: 0x02fac398,
      public: 0x02facafd
    },
    bip44: 3,
    private: 0x9e,
    public: 0x1e,
    scripthash: 0x16
  }
}, common)

var test = util.assign({
  versions: {
    bip44: 1,
    private: 0xf1,
    public: 0x71,
    scripthash: 0xc4
  }
}, common)

module.exports = {
  main: main,
  test: test
}

},{"../util":14}],7:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'GamerCredits',
  unit: 'GMC'
}

var main = util.assign({
  versions: {
    bip32: {
      private: 0x019d9cfe,
      public: 0x019da462
    },
    private: 0xa6,
    public: 0x26,
    scripthash: 0x05
  }
}, common)

module.exports = {
  main: main,
  test: null
}

},{"../util":14}],8:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'Litecoin',
  unit: 'LTC'
}

var main = util.assign({
  versions: {
    bip32: {
      private: 0x019d9cfe,
      public: 0x019da462
    },
    bip44: 2,
    private: 0xb0,
    public: 0x30,
    scripthash: 0x05
  }
}, common)

var test = util.assign({
  versions: {
    bip44: 1,
    private: 0xef,
    public: 0x6f,
    scripthash: 0xc4
  }
}, common)

module.exports = {
  main: main,
  test: test
}

},{"../util":14}],9:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'MonetaryUnit',
  unit: 'MUE'
}

var main = util.assign({
  versions: {
    private: 0x8f,
    public: 0x0f,
    scripthash: 0x05
  }
}, common)

module.exports = {
  main: main,
  test: null
}

},{"../util":14}],10:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'Namecoin',
  unit: 'NMC'
}

var main = util.assign({
  versions: {
    // http://doc.satoshilabs.com/slips/slip-0044.html
    bip44: 7,
    private: 0xb4,
    public: 0x34,
    scripthash: 0x05
  }
}, common)

module.exports = {
  main: main,
  test: null
}

},{"../util":14}],11:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'Peercoin',
  unit: 'PPC'
}

var main = util.assign({
  versions: {
    bip44: 6,
    private: 0xc4,
    public: 0x44,
    scripthash: 0x05
  }
}, common)

module.exports = {
  main: main,
  test: null
}

},{"../util":14}],12:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'ReddCoin',
  unit: 'RDD'
}

var main = util.assign({
  versions: {
    bip44: 4,
    private: 0xbd,
    public: 0x3d,
    scripthash: 0x05
  }
}, common)

var test = util.assign({
  versions: {
    bip44: 1,
    private: 0xef,
    public: 0x6f,
    scripthash: 0xc4
  }
}, common)

module.exports = {
  main: main,
  test: test
}

},{"../util":14}],13:[function(require,module,exports){
var util = require('../util')

var common = {
  name: 'Uro',
  unit: 'URO'
}

var main = util.assign({
  versions: {
    private: 0xc4,
    public: 0x44,
    scripthash: 0x05
  }
}, common)

var test = util.assign({
  versions: {
    private: 0xef,
    public: 0x6f,
    scripthash: 0xc4
  }
}, common)

module.exports = {
  main: main,
  test: test
}

},{"../util":14}],14:[function(require,module,exports){
// shallow assign
function assign (o1, o2) {
  Object.keys(o2).forEach(function (key) {
    if (!(key in o1)) {
      o1[key] = o2[key]
    }
  })

  return o1
}

function endsWith (str, suffix) {
  var offset = str.length - suffix.length
  return str.lastIndexOf(suffix) === offset
}

module.exports = {
  assign: assign,
  endsWith: endsWith
}

},{}]},{},[1]);
