# mijin-catapult-tools

This tool is for easy operation of mijin Catapult(v.2)

## What can this tool do for you?

* Account
  * Generate
    * Create Cert file for Node
  * Info
* Transaction
  * Transaction
  * Mosaic
    * Create
    * Info
  * Namespace
    * Create Root
    * Create Sub
    * Link Mosaic
    * Link Address
    * Info
* Voting
  * Create
  * Info
  * Update

## Usage

```bash
$ mijin-catapult-tools
Usage: mijin-catapult-tools [options] [command]

This tool allows you to easily operate mijin Catapult

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  account         Account Info or Generate
  votingkey       Votingkey Create or Info or Update
  transaction     Transaction Announce or Info
  help [command]  display help for command
```

## Document

Operating instructions are provided in the Deployment Guide.

<https://aws.mijin.io/deployment/en/tech/operations/new_create_account.html>

<https://aws.mijin.io/deployment/en/deploy/aws/aws_tips_new_move_currency.html>

## Install

Assuming that yarn and nodejs >= 14.x are installed, execute the following

```bash
yarn global add  @tech-bureau/mijin-catapult-tools
echo 'export PATH="$HOME/.yarn/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
```

## Account Generate

```bash
$ mijin-catapult-tools account generate -h
Usage: mijin-catapult-tools account generate [options]

Generate Account

Options:
  -u, --url <mijinCatapultURL>    Specify the input of mijin URL
  -n, --nodename <nodeName>       Specify the input of node Name for CA (default: "node")
  -c, --certsdir <certDirectory>  Specify the input of Cert Directory(Output)
  -r, --readfile <config.json>    Specify the input of Read Config File
  -w, --writefile <config.json>   Specify the input of Write Config File
  -p, --privatekey <privateKey>   Specify the input of Balance Account Private Key
  -a, --address <privateKey>      Specify the input of Address
  -m, --message <message>         Specify the input of Transaction Message(Plain Only)
  -s, --service                   Specify the input Service Mode (default: false)
  -h, --help                      display help for command
```

### 01. Generate Only

```bash
$ mijin-catapult-tools account generate -u http://localhost:3000

2023-01-14T01:56:59.171Z [info] : mijin URL: http://localhost:3000
2023-01-14T01:56:59.171Z [info] : Network: 96
2023-01-14T01:56:59.171Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-14T01:56:59.171Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-14T01:56:59.171Z [info] : Start Account Generate...
2023-01-14T01:56:59.184Z [info] : New Account: {
  "publicKey": "F40467508EF6AB5D13B99303C3056D3C731F9AC54A4B49662BBE2A7B4A25657C",
  "privateKey": "488E5802CE58E7ACF0DDF5C02F6FA16A36806C6B4C56C33231B6D48F0C5B64DE",
  "address": "MCEBNFYCLHBO356SYWKN6CR6CXKZIQBX6REBEYQ"
}
```

### 02. Generate & Save Account Data

```bash
$ mijin-catapult-tools account generate -u http://localhost:3000 -s -w config.json
2023-01-14T01:58:41.498Z [info] : mijin URL: http://localhost:3000
2023-01-14T01:58:41.499Z [info] : Network: 96
2023-01-14T01:58:41.499Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-14T01:58:41.499Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-14T01:58:41.499Z [info] : Start Account Generate...
2023-01-14T01:58:41.557Z [info] : Write Config File: config.json
2023-01-14T01:58:41.566Z [info] : New Account: {
  "url": "http://localhost:3000",
  "workAccount": {
    "publicKey": "EB388302DF136FF078718737E55F281C5494A2EBD2A9E077E8E1597296F3F153",
    "privateKey": "DA57F17F42C927773A2A294B9C4E769BDE59CE98DA4276A3FF0590022A338B8A",
    "address": "MBOKZPFWEVVEZ6GZ5DT5VKC2UGWZTHVPSTPGNHQ"
  },
  "balanceAccount": {
    "publicKey": "",
    "privateKey": "",
    "address": ""
  },
  "mainAccount": {
    "publicKey": "19E8111C314714A3A97A770E8C2740B6B7207E11278FCAA87ECC86AEAB541512",
    "privateKey": "6BA02D48FF3257742B47366686DB28F0DC010655B26E53D8CCEAF8217F095266",
    "address": "MBO6WOREZL6MJOXZS3TAYYF7IOPUUCYTZKDKPXA"
  },
  "keylink": {
    "vrf": {
      "publicKey": "8052E2B41F40B6E78C8C099DC714C0E3B8A1C50BBAEF3A0E97D5CF055FD20A96",
      "privateKey": "6A31E148708B838D5B14896FA4BA683B33F19B39B2CD68847F13A9539110F406",
      "address": "MBWWMPQKGZZ3WGVNDWOLVZN5X7P7OSQ33MZ75CY"
    },
    "voting": {
      "publicKey": "2B5F1E7BE37BC21EB2ADCBADF74C732AC5ECAFA0F43CBD4F3C350727358903D4",
      "privateKey": "BC3A7BFC6CF6652262E7DFD2A913D0944C1B43326BF0160C258F1B2C892D0F8E",
      "address": "MA3CBEBNWCR2QVHTJUB5TP2EQGZBPJNMXDOV5NY"
    }
  },
  "test1Account": {
    "publicKey": "E0ABCF2E4AA72027AE5D5CCC251387E06A5FD1C9A2E7874BF3C324F331D40D8D",
    "privateKey": "E0852AC1BE63D679C697B00B0331D32C9ECE93F0E4B02D47C6BE922215752895",
    "address": "MAAA25DFVXVLYPCUHUJYHKJV6GPHGIH65YTQR5Q"
  },
  "test2Account": {
    "publicKey": "756E15C15A492A8C846228924BBE26B80B99F4969A70D15320F7B49C4DB70038",
    "privateKey": "59FD0FDD0C218CD4CF47C351C7ACF072F036A8515F5C275B3AC30F6FFC943EB7",
    "address": "MCUY65EGGFAORQTXNS4I5FIZMLLMXXU64I76SMQ"
  }
}
```

### 03. Generate & Save Account Data with balance Account

```bash
$ mijin-catapult-tools account generate -u http://localhost:3000 -s -r config.json -w config.json -p 90EEBCB77A767F8F5CCCE9D0F89A60CB2D7FCD5FD8F469E2F8BDFC0CDD8B8A2F

2023-01-14T01:59:14.696Z [info] : mijin URL: http://localhost:3000
2023-01-14T01:59:14.696Z [info] : Network: 96
2023-01-14T01:59:14.696Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-14T01:59:14.696Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-14T01:59:14.696Z [info] : Start Account Generate...
2023-01-14T01:59:14.755Z [info] : Write Config File: config.json
2023-01-14T01:59:14.758Z [info] : New Account: {
  "url": "http://localhost:3000",
  "workAccount": {
    "publicKey": "EB388302DF136FF078718737E55F281C5494A2EBD2A9E077E8E1597296F3F153",
    "privateKey": "DA57F17F42C927773A2A294B9C4E769BDE59CE98DA4276A3FF0590022A338B8A",
    "address": "MBOKZPFWEVVEZ6GZ5DT5VKC2UGWZTHVPSTPGNHQ"
  },
  "balanceAccount": {
    "publicKey": "4FAAC9BF9881893CB31BC2065E8A8D0B12364423E2A08DAF4F77E1FEF5D5B2E8",
    "privateKey": "90EEBCB77A767F8F5CCCE9D0F89A60CB2D7FCD5FD8F469E2F8BDFC0CDD8B8A2F",
    "address": "MCPYNELDE5QS63QBRZ2L7OLNZ63YPQJSOCEWXQI"
  },
  "mainAccount": {
    "publicKey": "19E8111C314714A3A97A770E8C2740B6B7207E11278FCAA87ECC86AEAB541512",
    "privateKey": "6BA02D48FF3257742B47366686DB28F0DC010655B26E53D8CCEAF8217F095266",
    "address": "MBO6WOREZL6MJOXZS3TAYYF7IOPUUCYTZKDKPXA"
  },
  "keylink": {
    "vrf": {
      "publicKey": "8052E2B41F40B6E78C8C099DC714C0E3B8A1C50BBAEF3A0E97D5CF055FD20A96",
      "privateKey": "DA57F17F42C927773A2A294B9C4E769BDE59CE98DA4276A3FF0590022A338B8A",
      "address": "MBWWMPQKGZZ3WGVNDWOLVZN5X7P7OSQ33MZ75CY"
    },
    "voting": {
      "publicKey": "2B5F1E7BE37BC21EB2ADCBADF74C732AC5ECAFA0F43CBD4F3C350727358903D4",
      "privateKey": "BC3A7BFC6CF6652262E7DFD2A913D0944C1B43326BF0160C258F1B2C892D0F8E",
      "address": "MA3CBEBNWCR2QVHTJUB5TP2EQGZBPJNMXDOV5NY"
    }
  },
  "test1Account": {
    "publicKey": "E0ABCF2E4AA72027AE5D5CCC251387E06A5FD1C9A2E7874BF3C324F331D40D8D",
    "privateKey": "E0852AC1BE63D679C697B00B0331D32C9ECE93F0E4B02D47C6BE922215752895",
    "address": "MAAA25DFVXVLYPCUHUJYHKJV6GPHGIH65YTQR5Q"
  },
  "test2Account": {
    "publicKey": "756E15C15A492A8C846228924BBE26B80B99F4969A70D15320F7B49C4DB70038",
    "privateKey": "59FD0FDD0C218CD4CF47C351C7ACF072F036A8515F5C275B3AC30F6FFC943EB7",
    "address": "MCUY65EGGFAORQTXNS4I5FIZMLLMXXU64I76SMQ"
  }
}
```

### 04. Generate & Save Account Data with Certs

```bash
$ mijin-catapult-tools account generate -u http://localhost:3000 -s -w config.json -c certs
2023-01-14T02:00:23.198Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:00:23.198Z [info] : Network: 96
2023-01-14T02:00:23.198Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-14T02:00:23.198Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-14T02:00:23.198Z [info] : Start Account Generate...
2023-01-14T02:00:23.265Z [info] : Create Cert Directory: certs
2023-01-14T02:00:23.265Z [info] : Create Cert: CA
2023-01-14T02:00:23.267Z [info] : Create Cert: Client
2023-01-14T02:00:23.268Z [info] : Write Config File: config.json
2023-01-14T02:00:23.269Z [info] : New Account: {
  "url": "http://localhost:3000",
  "workAccount": {
    "publicKey": "F44C01F72D664CE388F1820B6603E5EA97583D34972256A31A84D574F49DFF28",
    "privateKey": "FC80757B7A04AED3D8D2CBB57165033812E7C6E6C3EC5BF996B2959B2DAE8413",
    "address": "MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I"
  },
  "balanceAccount": {
    "publicKey": "",
    "privateKey": "",
    "address": ""
  },
  "mainAccount": {
    "publicKey": "219291478427B6B76BAEED56CE11FCBAA5FB345D6001339E8DD8069EDA74CB21",
    "privateKey": "C515EEF751C17E81E78012B6AED6C1859FEA497E40E8B777F1BB967B52A1B8FE",
    "address": "MAI3CVZYLKHUT2N3UZH4OG5VR4AGU2RA567ZL4Y"
  },
  "keylink": {
    "vrf": {
      "publicKey": "F28C8C9A0E0962CC1D54153A9BC2210EB9C79F5D6E0D28812BC28693AB0350CC",
      "privateKey": "4407EAE26192EAD1228FC455CC2447F4117BB20DD9BDDDA9080FA1F9EF4B799C",
      "address": "MCRJN3MZU7GV47V4ESEVAYERZVNDAOFLO5BLSBI"
    },
    "voting": {
      "publicKey": "B188926894A4DAFC7B12810D8B4743A62C64E2705A64A4C402BF32EA63B50144",
      "privateKey": "104314D84CCB13013637DCB18AD9D5896BEF7C2201B4294772FAE6DFFC4E3253",
      "address": "MBPEBI3TPGIVFB7USOC25QLF5VKGLQ4XK7CRJ6A"
    }
  },
  "test1Account": {
    "publicKey": "ABC2543538B65A26165931DAAD360C2456C1F6238F981E25D4D08EBF51AAA576",
    "privateKey": "C35361E100930FFE6DD486219B4CA15154397698C08CBD882A325A7BAE690971",
    "address": "MCLMS7UM6VVC3IE2ED7U2FNNPZ6H4F765BPEAAY"
  },
  "test2Account": {
    "publicKey": "6A09BA313E866127051D1F5772008C4711F882EF2AE0D7CFD7A1CB278F2DABD3",
    "privateKey": "6F80E6C2DF36EE004118B972180AEAB51C64EEEF555CA6D7A37144740146E64D",
    "address": "MC3PVQKIU42XX6C4JHLYB34FO3WWQWXFEHSI7RA"
  }
}
$ ls -1 certs/
ca.cert.pem
ca.pubkey.pem
node.crt.pem
node.full.crt.pem
node.key.pem
```

## Account Info

```bash
$ mijin-catapult-tools account info -h
Usage: mijin-catapult-tools account info [options]

Get Account Info

Options:
  -t, --type <work|balance|vrf|voting|other>  Specify the type of Account (default: "balance")
  -u, --url <mijinCatapultURL>                Specify the input of mijin URL
  -r, --readfile <config.json>                Specify the input of Read Config File
  -a, --address <privateKey>                  Specify the input of Address
  -s, --service                               Specify the input Service Mode (default: false)
  -h, --help                                  display help for command
```

### 01. balance Account Info

```bash
$ mijin-catapult-tools account info -r config.json

2023-01-14T02:02:52.202Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:02:52.203Z [info] : Network: 96
2023-01-14T02:02:52.203Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-14T02:02:52.203Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-14T02:02:52.203Z [info] : Start Account Info
2023-01-14T02:02:52.222Z [info] : balance Account: {
  "publicKey": "4FAAC9BF9881893CB31BC2065E8A8D0B12364423E2A08DAF4F77E1FEF5D5B2E8",
  "address": "MCPYNELDE5QS63QBRZ2L7OLNZ63YPQJSOCEWXQI",
  "mosaics": [
    {
      "id": "268CF9B2D33FBD22",
      "amount": "8998978698000000",
      "currency": true,
      "harvest": false
    },
    {
      "id": "4C39D26C386E3182",
      "amount": "15000000",
      "currency": false,
      "harvest": true
    }
  ],
  "keylink": {
    "vrf": {
      "publicKey": "2A88BA2689D584B03A3D4B829347F0A8B63AF55A8E9F176F1D2327F9E87E22D8"
    },
    "voting": {
      "publicKey": "22BB9DCA05D483E4D4DDE764E8742E741ADA676F461D5F3E6663840C5290320F",
      "startEpoch": 1,
      "endEpoch": 26280
    }
  }
}
```

### 02. work Account Info

```bash
$ mijin-catapult-tools account info -r config.json -t work

2023-01-10T02:07:27.005Z [info] : mijin URL: http://xxxxxxxx:3000
2023-01-10T02:07:27.006Z [info] : Network: 96
2023-01-10T02:07:27.006Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-10T02:07:27.006Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-10T02:07:27.006Z [info] : Start Account Info
2023-01-10T02:07:27.037Z [info] : work Account: {
  "publicKey": "0000000000000000000000000000000000000000000000000000000000000000",
  "address": "MCCMPJAFJDAYMOG67DSBQ6YQ6VUMGUTYKSMY32Y",
  "mosaics": [
    {
      "id": "268CF9B2D33FBD22",
      "amount": "100000000",
      "currency": true,
      "harvest": false
    }
  ],
  "keylink": {
    "vrf": {
      "publicKey": ""
    },
    "voting": {
      "publicKey": "",
      "startEpoch": "",
      "endEpoch": ""
    }
  }
}
```

### 03. other Account Info(Use Address)

```bash
$ mijin-catapult-tools account info -r config.json -t other -a MAVCWTMXHTWG5H63MDUX23AQUQPIKLKVUCVZ7JA

2023-01-10T02:05:21.479Z [info] : mijin URL: http://xxxxxxxx:3000
2023-01-10T02:05:21.479Z [info] : Network: 96
2023-01-10T02:05:21.479Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-10T02:05:21.479Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-10T02:05:21.479Z [info] : Start Account Info
2023-01-10T02:05:21.484Z [info] : get Account: {
  "publicKey": "0000000000000000000000000000000000000000000000000000000000000000",
  "address": "MAVCWTMXHTWG5H63MDUX23AQUQPIKLKVUCVZ7JA",
  "mosaics": [
    {
      "id": "268CF9B2D33FBD22",
      "amount": "100000000",
      "currency": true,
      "harvest": false
    }
  ],
  "keylink": {
    "vrf": {
      "publicKey": ""
    },
    "voting": {
      "publicKey": "",
      "startEpoch": "",
      "endEpoch": ""
    }
  }
}
```

## Transfer

### 01. balance Account to work Account Currency 100.000000

```bash
$ mijin-catapult-tools transaction transfer -f balance -d work -a 100

2023-01-14T02:04:54.801Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:04:54.801Z [info] : Network: 96
2023-01-14T02:04:54.801Z [info] : Start Transfer Account...
2023-01-14T02:04:54.813Z [info] : From Account Address: MCPYNELDE5QS63QBRZ2L7OLNZ63YPQJSOCEWXQI
2023-01-14T02:04:54.814Z [info] : Dest Account Address: MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I
2023-01-14T02:04:54.814Z [info] : Currecny Amount: 100000000
2023-01-14T02:04:54.822Z [info] : Start Transfer Transaction...
2023-01-14T02:05:08.419Z [info] : End Transfer Transaction
2023-01-14T02:05:08.419Z [info] : http://localhost:3000/transactionStatus/13C6D560CBE81CEBBD9EEA40CA79652257200E6C151ED80CFCDDB345C9B30EB2
2023-01-14T02:05:08.419Z [info] : http://localhost:3000/transactions/confirmed/13C6D560CBE81CEBBD9EEA40CA79652257200E6C151ED80CFCDDB345C9B30EB2
```

### 02. balance Account to New Generate Account

New Account Generate

```bash
$ mijin-catapult-tools account generate -r config.json

2023-01-14T02:05:52.451Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:05:52.451Z [info] : Network: 96
2023-01-14T02:05:52.452Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-14T02:05:52.452Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-14T02:05:52.452Z [info] : Start Account Generate...
2023-01-14T02:05:52.466Z [info] : New Account: {
  "publicKey": "61CD4007B8049FEF3B411F0126945EAF3D43181BAC0FEB3AF967C9FD92384687",
  "privateKey": "66A059AED21EABB84173065ED6BF893BA7DFD94F69EC08394BF73D84DFD2DB1D",
  "address": "MDRVLLZHSVAZXS67WBWLHXBJDYFB26E6BYUMYGY"
}
```

balance Account to New Generate Account

```bash
$ mijin-catapult-tools transaction transfer -f balance -d MDRVLLZHSVAZXS67WBWLHXBJDYFB26E6BYUMYGY -a 100

2023-01-14T02:06:37.237Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:06:37.238Z [info] : Network: 96
2023-01-14T02:06:37.238Z [info] : Start Transfer Account...
2023-01-14T02:06:37.251Z [info] : From Account Address: MCPYNELDE5QS63QBRZ2L7OLNZ63YPQJSOCEWXQI
2023-01-14T02:06:37.251Z [info] : Dest Account Address: MDRVLLZHSVAZXS67WBWLHXBJDYFB26E6BYUMYGY
2023-01-14T02:06:37.251Z [info] : Currecny Amount: 100000000
2023-01-14T02:06:37.259Z [info] : Start Transfer Transaction...
2023-01-14T02:06:49.160Z [info] : End Transfer Transaction
2023-01-14T02:06:49.160Z [info] : http://localhost:3000/transactionStatus/B693BDAC4801811806A7E9BBD522CFAEFCC6DAD813913E80A462490EE42BD15B
2023-01-14T02:06:49.160Z [info] : http://localhost:3000/transactions/confirmed/B693BDAC4801811806A7E9BBD522CFAEFCC6DAD813913E80A462490EE42BD15B
```

New Generate Account info

```bash
$ mijin-catapult-tools account info -r config.json -t other -a MDRVLLZHSVAZXS67WBWLHXBJDYFB26E6BYUMYGY
2023-01-14T02:07:41.456Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:07:41.457Z [info] : Network: 96
2023-01-14T02:07:41.457Z [info] : Mosaic Currency Id: 268CF9B2D33FBD22
2023-01-14T02:07:41.457Z [info] : Mosaic Harvest Id: 4C39D26C386E3182
2023-01-14T02:07:41.457Z [info] : Start Account Info
2023-01-14T02:07:41.460Z [info] : get Account: {
  "publicKey": "0000000000000000000000000000000000000000000000000000000000000000",
  "address": "MDRVLLZHSVAZXS67WBWLHXBJDYFB26E6BYUMYGY",
  "mosaics": [
    {
      "id": "268CF9B2D33FBD22",
      "amount": "100000000",
      "currency": true,
      "harvest": false
    }
  ],
  "keylink": {
    "vrf": {
      "publicKey": ""
    },
    "voting": {
      "publicKey": "",
      "startEpoch": "",
      "endEpoch": ""
    }
  }
}
```

## Mosaic Create

```bash
$ mijin-catapult-tools transaction mosaic create -h
Usage: mijin-catapult-tools transaction mosaic create [options]

Create Mosaic and Announce Mosaic Transaction

Options:
  -o, --owner <work|balance|main|test1|test2|other>  Specify the input of from Account (default: "other")
  -u, --url <mijinCatapultURL>                       Specify the input of mijin URL
  -s, --supply <supply>                              Specify the input of Mosaic Supply (default: "1")
  -d, --divisibility <divisibility>                  Specify the input of Mosaic divisibility (default: "0")
  --supplymutable <supplymutable>                    Specify the input of Mosaic Flags option supply Mutable (default: true)
  --transferable <transferable>                      Specify the input of Mosaic Flags option Transferable (default: true)
  --restrictable <restrictable>                      Specify the input of Mosaic Flags option Restrictable (default: true)
  --revokable <revokable>                            Specify the input of Mosaic Flags option Revokable (default: false)
  -r, --readfile <config.json>                       Specify the input of Read Config File
  -p, --privatekey <privateKey>                      Specify the input of Mosaic Owener Account Private Key
  -h, --help                                         display help for command
```

### 01. Create simply Mosaic(Owner work Account)

If you need to pay a fee, balance Account to work Account
Trasanction announcement fees are set automatically(min Multiplier).

```bash
$ mijin-catapult-tools transaction transfer -f balance -d work -a 1000

2023-01-14T02:08:28.776Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:08:28.776Z [info] : Network: 96
2023-01-14T02:08:28.776Z [info] : Start Transfer Account...
2023-01-14T02:08:28.789Z [info] : From Account Address: MCPYNELDE5QS63QBRZ2L7OLNZ63YPQJSOCEWXQI
2023-01-14T02:08:28.789Z [info] : Dest Account Address: MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I
2023-01-14T02:08:28.789Z [info] : Currecny Amount: 1000000000
2023-01-14T02:08:28.797Z [info] : Start Transfer Transaction...
2023-01-14T02:08:41.401Z [info] : End Transfer Transaction
2023-01-14T02:08:41.401Z [info] : http://localhost:3000/transactionStatus/98343E8FD39313131366C17EB76E389DC2C181234B8BE97A12793ABCF185CEA6
2023-01-14T02:08:41.401Z [info] : http://localhost:3000/transactions/confirmed/98343E8FD39313131366C17EB76E389DC2C181234B8BE97A12793ABCF185CEA6
```

Create Mosaic

```bash
$ mijin-catapult-tools transaction mosaic create -r config.json -o work

2023-01-14T02:09:46.550Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:09:46.550Z [info] : Network: 96
2023-01-14T02:09:46.550Z [info] : Create Mosaic...
2023-01-14T02:09:46.563Z [info] : Mosaic Owener Account: MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I
2023-01-14T02:09:46.563Z [info] : MosaicId: 187EA3644EAC4978
2023-01-14T02:09:46.563Z [info] : Mosaic Flags: supplymutable:true, transferable:true, restrictable:true, revokable:false
2023-01-14T02:09:46.563Z [info] : Mosaic Supply: divisibility:0, supply:1
2023-01-14T02:09:46.573Z [info] : Transaction Fee: 0
2023-01-14T02:09:46.573Z [info] : Mosaic Rental Fee: 0
2023-01-14T02:09:46.573Z [info] : Start Aggregate Transaction...
2023-01-14T02:09:50.057Z [info] : End Aggregate Transaction
2023-01-14T02:09:50.057Z [info] : http://localhost:3000/transactionStatus/C4B44133A2C7D89B94751DE58A968DD7AAC0D4EC2565830CE492A57E958554A0
2023-01-14T02:09:50.057Z [info] : http://localhost:3000/transactions/confirmed/C4B44133A2C7D89B94751DE58A968DD7AAC0D4EC2565830CE492A57E958554A0
```

Get Mosaic Info

```bash
$ mijin-catapult-tools transaction mosaic info -r config.json -m 187EA3644EAC4978
2023-01-14T02:10:56.970Z [info] : mijin URL: http://localhost:3000
2023-01-14T02:10:56.970Z [info] : Network: 96
2023-01-14T02:10:56.973Z [info] : Mosaic Info: {
  "ownerAddress": "MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I",
  "mosaicId": "187EA3644EAC4978",
  "supply": 1,
  "divisibility": 0
}
```

### Custom Mosaic

Amount: 1000.000000
divisibility: 6
Supplymutable: true
Transferable: true
Rrestrictable: true
Revokable: true

```bash
$ mijin-catapult-tools transaction mosaic create -r config.json -o work -s 1000 -d 6 --revokable true
2023-01-16T06:28:31.289Z [info] : mijin URL: http://localhost:3000
2023-01-16T06:28:31.289Z [info] : Network: 96
2023-01-16T06:28:31.289Z [info] : Create Mosaic...
2023-01-16T06:28:31.303Z [info] : Mosaic Owener Account: MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I
2023-01-16T06:28:31.303Z [info] : MosaicId: 6720D8164C27F34E
2023-01-16T06:28:31.303Z [info] : Mosaic Flags: supplymutable:true, transferable:true, restrictable:true, revokable:true
2023-01-16T06:28:31.303Z [info] : Mosaic Supply: divisibility:6, supply:1000000000
2023-01-16T06:28:31.313Z [info] : Transaction Fee: 0
2023-01-16T06:28:31.313Z [info] : Mosaic Rental Fee: 0
2023-01-16T06:28:31.313Z [info] : Start Aggregate Transaction...
2023-01-16T06:28:34.464Z [info] : End Aggregate Transaction
2023-01-16T06:28:34.464Z [info] : http://localhost:3000/transactionStatus/733BA25FECEECC334CAD0E4B86F80676661EA34DC1781E205C0034536A5A330A
2023-01-16T06:28:34.464Z [info] : http://localhost:3000/transactions/confirmed/733BA25FECEECC334CAD0E4B86F80676661EA34DC1781E205C0034536A5A330A
```

## Namespace

```bash
$ mijin-catapult-tools transaction namespace -h
Usage: mijin-catapult-tools transaction namespace [options] [command]

Namespace Transaction Announce or Info

Options:
  -h, --help              display help for command

Commands:
  create-root [options]   Create Root Namespace and Announce Mosaic Transaction
  create-sub [options]    Create Sub Namespace and Announce Mosaic Transaction
  link-mosaic [options]   Link Mosaic and Announce Transaction
  link-address [options]  Link Address and Announce Transaction
  info [options]          Get Namespace Info
  help [command]          display help for command
```

### Create Root Namespace (Owner work Account)

Namespace Name: test
Duration: 1000

```bash
$ mijin-catapult-tools transaction namespace create-root -r config.json -o work -n test -d 1000
2023-03-10T06:11:01.298Z [info] : mijin URL: http://localhost:3000
2023-03-10T06:11:01.299Z [info] : Network: 96
2023-03-10T06:11:01.300Z [info] : Create Root Namespace...
2023-03-10T06:11:01.345Z [info] : Root Namespace Owner Account: MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I
2023-03-10T06:11:01.346Z [info] : Namespace Name: test
2023-03-10T06:11:01.348Z [info] : Namespace Transaction: {"transaction":{"type":16718,"network":96,"version":1,"maxFee":"0","deadline":"118141861343","signature":"","registrationType":0,"name":"test","id":"D401054C1965C26E","duration":"1000"}}
2023-03-10T06:11:01.378Z [info] : Transaction Fee: 0
2023-03-10T06:11:01.378Z [info] : Namespace Rental Fee Per Block: 1
2023-03-10T06:11:01.378Z [info] : Start Announce Transaction...
2023-03-10T06:11:06.415Z [info] : End Transaction
2023-03-10T06:11:06.415Z [info] : http://localhost:3000/transactionStatus/57275DF8349C3FB582BA5B1B854FA8C270C467B8A48EB9B9E24EC6F3F7A1786B
2023-03-10T06:11:06.415Z [info] : http://localhost:3000/transactions/confirmed/57275DF8349C3FB582BA5B1B854FA8C270C467B8A48EB9B9E24EC6F3F7A1786B
```

### Namespace Info

Namespace Name: test

```bash
$ mijin-catapult-tools transaction namespace info -r config.json -n test
2023-03-10T06:13:34.668Z [info] : mijin URL: http://localhost:3000
2023-03-10T06:13:34.669Z [info] : Network: 96
2023-03-10T06:13:34.670Z [info] : Namespace Id: test
2023-03-10T06:13:34.749Z [info] : Namespace Info: {
  "active": true,
  "ownerAddress": "MDLEKG5MKKAPFBM3XWZKYQEDYRJO67MUJXFDP6I",
  "namespaceId": "D401054C1965C26E",
  "parentId": "0000000000000000"
}
```

## Create Votingkey Dat file(for main Account)

```bash
$ mijin-catapult-tools votingkey create -h
Usage: mijin-catapult-tools votingkey create [options]

Create Votingkey

Options:
  -u, --url <mijinCatapultURL>  Specify the input of mijin URL
  -r, --readfile <config.json>  Specify the input of Read Config File
  -s, --startepoch <72>         Specify the input of Voting Start Epoch (default: "72")
  -e, --endepoch <1>            Specify the input of Voting Stop Epoch (default: "26280")
  -d, --savedir <dir>           Specify the input of Save Voting Key Directory (default: "current")
  -h, --help                    display help for command
```

```bash
$ mijin-catapult-tools votingkey create -r config.json -d voting

2023-01-14T02:26:12.134Z [info] : Start Voting Key Create...
2023-01-14T02:26:12.134Z [info] : votingSetGroup: 160
2023-01-14T02:26:12.134Z [info] : votingMaxEpoch: 120
2023-01-14T02:26:12.134Z [info] : votingStartEpoch: 120
2023-01-14T02:26:12.134Z [info] : votingEndEpoch: 26400
2023-01-14T02:26:12.134Z [info] : blockGenerationTargetTime: 15
2023-01-14T02:26:22.623Z [info] : Create Cert Directory: voting
2023-01-14T02:26:22.626Z [info] : Voting Key file Create: SUCCESS voting/private_key_tree1.dat
```

```bash
$ mijin-catapult-tools votingkey info -r config.json -d voting
2023-01-14T02:27:03.593Z [info] : Start Voting Key Check Dir... voting
2023-01-14T02:27:03.594Z [info] : votingfile: index0:  {"publicKey":"B188926894A4DAFC7B12810D8B4743A62C64E2705A64A4C402BF32EA63B50144","startEpoch":120,"endEpoch":26400,"filename":"private_key_tree1.dat"}
```

## Update Votingkey Dat File

Update on the assumption that the private_key_tree1.dat file exists.

```bash
$ mijin-catapult-tools votingkey update -h
Usage: mijin-catapult-tools votingkey update [options]

Update Votingkey

Options:
  -u, --url <mijinCatapultURL>  Specify the input of mijin URL
  -r, --readfile <config.json>  Specify the input of Read Config File
  -s, --startepoch <72>         Specify the input of Voting Start Epoch (default: "72")
  -e, --endepoch <1>            Specify the input of Voting Stop Epoch (default: "26280")
  -d, --savedir <dir>           Specify the input of Save Voting Key Directory (default: "current")
  -h, --help                    display help for command
```

```bash
$ mijin-catapult-tools votingkey update -r config.json -d voting
2023-01-14T02:29:26.308Z [info] : Start Voting Key Update...
2023-01-14T02:29:26.309Z [info] : votingSetGroup: 160
2023-01-14T02:29:26.310Z [info] : votingMaxEpoch: 26400
2023-01-14T02:29:26.310Z [info] : votingStartEpoch: 26401
2023-01-14T02:29:26.310Z [info] : votingEndEpoch: 52680
2023-01-14T02:29:26.310Z [info] : blockGenerationTargetTime: 15
2023-01-14T02:29:36.774Z [info] : Voting Key file Create: SUCCESS voting/private_key_tree2.dat
```

## Thanks

We used [symbol-bootstrap](https://github.com/fboucquez/symbol-bootstrap) source in the Voting source code.
