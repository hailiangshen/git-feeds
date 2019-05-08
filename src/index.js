const request = require('request')
const feedparser = require("feedparser")
const config = require('../config/fe.config.json')
const { execSync } = require('child_process')

const gitUtil = require('./git.util').getUtil('E:/code/实习/xb-internship-project')

console.log(gitUtil.isAlreadyupToDate())



// let getCurrentBranch = (dir = null) => {
//     let branch = execSync('git rev-parse --abbrev-ref HEAD', {
//         cwd: dir,
//         encoding: 'utf-8',
//         windowsHide: true
//     })
//     .replace(/\s+/g, '');
//     console.log(branch)
// }

// let getLog = () => {
//     // merge remotes/origin/dev-hl => Already up-to-date.

//     let _cmd = `git log -1 origin/master --pretty=format:'%H'`
//     // git reset --hard [HEAD]

// }

// let getGitCommits = (branch = 'master') => {
//     let repositories = 'http://git.greedyint.com/1course/Myth';
//     let url = `${repositories}/commits/${branch}?format=atom&rss_token=${config.RSSToken}`

//     // You need to sign in or sign up before continuing.
//     let options = {
//         url,
//         headers: {
//             "content-type": "application/atom+xml; charset=utf-8;"
//         },
//     }

//     request.get(options, (err, response, body) => {
//         // xml2js htmlparser2
//         if(err) {

//         } else {
//             htmlparser.DomHandler
//         }
//         console.log(err, response, body)
//     })
// }

// // getGitCommits()

// // getCurrentBranch('E:/code/实习/xb-internship-project')


// let hasMergeAll = (branch = 'master') => {
//     let mergeResult = execSync(`git merge remotes/origin/dev-hl`, {
//         cwd: 'E:/code/实习/xb-internship-project',
//         encoding: 'utf-8',
//         windowsHide: true
//     }).replace(/\s+/g, '');

//     if(mergeResult == 'Alreadyup-to-date.') {
//         return true
//     } else {
//         let _cmd = `git log -1 remotes/origin/master --pretty=format:%H` // currentBranch
//         let lastHead = execSync(_cmd, {
//             cwd: 'E:/code/实习/xb-internship-project',
//             encoding: 'utf-8',
//             windowsHide: true
//         }).replace(/\s+/g, '');
//         execSync(`git reset --hard ${lastHead}`, {
//             cwd: 'E:/code/实习/xb-internship-project',
//             encoding: 'utf-8',
//             windowsHide: true
//         })
//         return false
//     }
// }

// // console.log(hasMergeAll())