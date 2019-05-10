const { execSync } = require('./exec.cmd')

class GitUtil{
    constructor(repositoryPath) {
        this.repositoryPath = repositoryPath
    }

    getCurrentBranch() {
        return execSync('git rev-parse --abbrev-ref HEAD', this.repositoryPath).replace(/\s+/g, '')
    }

    isAlreadyupToDate(withBranch = 'master') {
        try{
            let mergeResult = execSync(`git merge remotes/origin/${withBranch}`, this.repositoryPath).replace(/\s+/g, '');
            // git 知道Alreadyup-to-date的原理是什么，有没有更简便的判断方法？
            if(mergeResult == 'Alreadyup-to-date.') {
                return true
            } else {
                throw new Error('代码未更新')
            }
        }catch(err) {
            // 回滚
            let currentBranch = this.getCurrentBranch()
            let _cmd = `git log -1 remotes/origin/${currentBranch} --pretty=format:%H`
            let lastHead = execSync(_cmd, this.repositoryPath).replace(/\s+/g, '')
            execSync(`git reset --hard ${lastHead}`, this.repositoryPath)
            return false
        }
    }

    hasAnyThingToCommitOrPush() {
        let data = execSync('git status -uno', this.repositoryPath)
        return !data.includes('Your branch is up-to-date')
    }
}

module.exports = {
    getUtil(repositoryPath) {
        console.info(`feed at ${repositoryPath}`)
        return new GitUtil(repositoryPath)
    }
};