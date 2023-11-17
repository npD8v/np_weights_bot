const fs = require('fs').promises;

const { LOCAL_PATH } = process.env;

class Local {
    constructor(localPath) {
        this.localPath = localPath;
    }

    async isFileExist(){
        try {
            await fs.access(this.localPath);
            return true;
          } catch (error) {
            return false;
          }    }

    async readFile() {
        try{
            const data = await fs.readFile(this.localPath, 'utf8');
            return data;
        } catch(error) {
            throw error;
        }
    }

    async writeFile(data) {
        try{
            await fs.writeFile(this.localPath, data);
        } catch(error) {
            throw error;
        }
    }
}

module.exports = new Local(LOCAL_PATH)