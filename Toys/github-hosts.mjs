import cheerio from 'cheerio'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import fetch from 'node-fetch'

const getIPv4Regex = () => new RegExp('\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', 'gi')

const isIPv4 = (text) => getIPv4Regex().test(text)

const domains = ['github.com', 'gist.github.com', 'github.global.ssl.fastly.net']

async function getDomainIP(url) {
  const text = await fetch(`https://ipaddress.com/website/${url}`).then((res) => res.text())
  const $ = cheerio.load(text)
  const items = $('.panel tbody tr')
  let IPs = []
  let ip = ''
  items.each(function () {
    const node1 = $(this).find('th')
    const node2 = $(this).find('td')
    if (node1.text().includes('IP Address')) {
      ip = node2.text()
      if (isIPv4(ip)) IPs.push(ip)
    }
  })
  // 多个ip地址
  if (ip.includes('IPv4')) {
    items.each(function () {
      const node = $(this).find('td')
      const text = node.text()
      const match = text.match(getIPv4Regex())
      if (Array.isArray(match) && match.length) IPs.push(...match)
    })
  }
  return IPs
}

async function start() {
  const hosts = []
  for (const domain of domains) {
    const IPs = await getDomainIP(domain)
    console.info(`domain: ${domain} ip: ${IPs}`)
    if (Array.isArray(IPs)) {
      hosts.push(...IPs.map((ip) => `${ip.trim()} ${domain}`))
    }
  }
  return hosts
}

const updateHosts = (hosts) => {
  const start = '# gitlab start'
  const end = '# gitlab end'

  const hostPath = 'C:\\Windows\\System32\\drivers\\etc\\hosts'
  const hostText = readFileSync(hostPath, { encoding: 'utf8' })

  const hostList = hostText.split('\r\n')
  const fromIdx = hostList.indexOf(start)
  const toIdx = hostList.indexOf(end)

  if (fromIdx === -1 && toIdx === -1) hostList.push(start, ...hosts, end)
  else hostList.splice(fromIdx + 1, toIdx - fromIdx - 1, ...hosts)

  writeFileSync(hostPath, hostList.join('\r\n'), { encoding: 'utf8' })
  execSync('ipconfig /flushdns')
  console.info('Refresh over')
}

start().then(updateHosts)
