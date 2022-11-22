interface TransformedUpiId {
  prefix: string
  raw: string
  params: {
    am: string
    cu: string
    mc: string
    mode: string
    orgid: string
    pa: string
    pn: string
    purpose: string
    sign: string
    tn: string
    tr: string
    url: string
  }
}

export function transformUpiId(upiId: string): TransformedUpiId {
  const [prefix, rest] = upiId.split("://pay?")

  const params = rest.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=", 2)
    ;(acc as any)[key] = value.replace("%20", " ")
    return acc
  }, {})

  // @ts-ignore
  return { prefix, params, raw: upiId }
}
