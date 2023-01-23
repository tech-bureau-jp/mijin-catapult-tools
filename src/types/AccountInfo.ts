export interface AccountInfo {
  url: string,
  network: string,
  account: string,
  address: string,
  mosaics: mosaics[],
  linkedKeys: {
    linked: string,
      node: string,
      vrf: string,
      voting: string
  }
}

interface mosaics {
  mosaic: string;
  amount: string;
  namespaceAlias: string;
}[]