import cheerio from 'cheerio'
import { readFileSync, writeFileSync } from 'fs'
import fetch from 'node-fetch'

const domains = ['github.com', 'gist.github.com', 'github.global.ssl.fastly.net']

async function getDomainIP(url) {
  const text = await fetch(`https://ipaddress.com/website/${url}`).then((res) => res.text())
  const $ = cheerio.load(text)
  const items = $('.panel tbody tr')
  let ip = ''
  items.each(function (i, ele) {
    const node1 = $(this).find('th')
    const node2 = $(this).find('td')
    if (node1.text().includes('IP Address')) ip = node2.text()
  })
  return ip
}

async function start() {
  const hosts = []
  for (const domain of domains) {
    const ip = await getDomainIP(domain)
    console.info(`domain: ${domain} ip: ${ip}`)
    if (ip) hosts.push(`${ip} ${domain}`)
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
}

start().then(updateHosts)
