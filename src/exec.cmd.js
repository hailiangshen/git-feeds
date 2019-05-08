const { execSync } = require('child_process')
const iconv = require('iconv-lite')


module.exports = {
    execSync: (cmd, dir = null, encoding = 'utf-8') => {
        let stdout = execSync(cmd, {
            cwd: dir,
            encoding: 'buffer',
            timeout: 1000 * 60,
            windowsHide: true
        })

        let data = iconv.decode(stdout, 'utf-8')
        return data
    }
}
