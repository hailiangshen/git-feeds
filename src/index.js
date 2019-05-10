const GitUtil = require('./git.util')
const path = require('path')
const fs = require('fs')

let checkGitStatus = (repositoryPath) => {
    while(!fs.existsSync(path.join(repositoryPath, '.git'))) {
        let _repositoryPath = path.join(repositoryPath, '..')
        if(!_repositoryPath || _repositoryPath == repositoryPath) {
            throw new Error('no git repository found')
        }
        repositoryPath = _repositoryPath;
    }

    const gitUtil = GitUtil.getUtil(repositoryPath) // 'E:/code/实习/xb-internship-project'

    if(gitUtil.hasAnyThingToCommitOrPush()) {
        throw new Error(`<${repositoryPath}>: 当前目录有代码未提交！`)
    } else if(!gitUtil.isAlreadyupToDate()) {
        throw new Error('代码未合并！')
    } else {
        console.log('代码检查通过！')
    }
}

module.exports = checkGitStatus