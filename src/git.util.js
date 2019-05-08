const { execSync } = require('./exec.cmd')

let getCurrentBranch = (dir = null) => {
    return execSync('git rev-parse --abbrev-ref HEAD').replace(/\s+/g, '');
}


let isAlreadyupToDate = (withBranch = 'master') => {
    let mergeResult = execSync(`git merge remotes/origin/dev-hl`, {
        cwd: 'E:/code/实习/xb-internship-project',
        encoding: 'utf-8',
        windowsHide: true
    }).replace(/\s+/g, '');

    if(mergeResult == 'Alreadyup-to-date.') {
        return true
    } else {
        let _cmd = `git log -1 remotes/origin/master --pretty=format:%H` // currentBranch
        let lastHead = execSync(_cmd, {
            cwd: 'E:/code/实习/xb-internship-project',
            encoding: 'utf-8',
            windowsHide: true
        }).replace(/\s+/g, '');
        execSync(`git reset --hard ${lastHead}`, {
            cwd: 'E:/code/实习/xb-internship-project',
            encoding: 'utf-8',
            windowsHide: true
        })
        return false
    }
}

class GitUtil{
    constructor(repositoryPath) {
        this.repositoryPath = repositoryPath
    }

    getCurrentBranch() {
        return execSync('git rev-parse --abbrev-ref HEAD', this.repositoryPath).replace(/\s+/g, '');
    }

    isAlreadyupToDate(withBranch = 'master') {
        try{
            let mergeResult = execSync(`git merge remotes/origin/${withBranch}`, this.repositoryPath).replace(/\s+/g, '');
            if(mergeResult == 'Alreadyup-to-date.') {
                return true
            } else {
                throw new Error('代码未更新')
            }
        }catch(err) {
            // 回滚
            let currentBranch = this.getCurrentBranch()
            let _cmd = `git log -1 remotes/origin/${currentBranch} --pretty=format:%H`
            let lastHead = execSync(_cmd, this.repositoryPath).replace(/\s+/g, '');
            execSync(`git reset --hard ${lastHead}`, this.repositoryPath)
            return false
        }
    }
}

module.exports = {
    getUtil(repositoryPath) {
        return new GitUtil(repositoryPath)
    }
};