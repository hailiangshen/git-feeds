const GitUtil = require('./git.util')

let checkGitStatus = (path) => {
    const gitUtil = GitUtil.getUtil(path) // 'E:/code/实习/xb-internship-project'

    if(gitUtil.hasAnyThingToCommitOrPush()) {
        throw new Error('当前目录有代码未提交！')
    } else if(!gitUtil.isAlreadyupToDate()) {
        throw new Error('代码未合并！')
    } else {
        console.log('代码检查通过！')
    }
}

module.exports = checkGitStatus