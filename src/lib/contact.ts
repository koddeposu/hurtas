export const CONTACT_INFO = {
  companyName: "Hürtaş Beton",
  primaryPhone: {
    display: "0212 683 10 04",
    intlDisplay: "+90 212 683 10 04",
    href: "+902126831004",
    schema: "+90-212-683-1004",
  },
  mobilePhone: {
    display: "0553 032 17 46",
    intlDisplay: "+90 553 032 17 46",
    href: "+905530321746",
    schema: "+90-553-032-1746",
  },
  email: "info@hurtasbeton.com",
  address: {
    street: "Çilingir Mahallesi Sündüs Sokak No:13",
    note: "Araç Muayene İstasyonu Önü",
    locality: "Arnavutköy",
    region: "İstanbul",
    short: "Arnavutköy / İstanbul",
    full: "Çilingir Mahallesi Sündüs Sokak No:13, Araç Muayene İstasyonu Önü, Arnavutköy/İstanbul",
    mapQuery:
      "Çilingir Mahallesi Sündüs Sokak No:13 Araç Muayene İstasyonu Önü Arnavutköy İstanbul",
  },
};

export const CONTACT_PHONES = [
  CONTACT_INFO.primaryPhone,
  CONTACT_INFO.mobilePhone,
] as const;

const encodedMapQuery = encodeURIComponent(CONTACT_INFO.address.mapQuery);

export const CONTACT_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`;
export const CONTACT_MAP_EMBED_URL = `https://www.google.com/maps?q=${encodedMapQuery}&output=embed`;
