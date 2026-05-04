/**
 * This is a hack to get some crude cachebusting working for wordpress gutenberg blocks
 * Run this after build
 */
import * as fs from 'fs';
import path from 'path';
import glob from 'glob';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

glob(__dirname + '/build/blocks/**/block.json', {}, (err, files)=> {
    files.forEach(file => {
        let block = readBlock(file);
        let dir = path.dirname(file);
        let style = null;
        if(block.style) {
            if(Array.isArray(block.style)) {
                style = block.style[0];
            } else {
                style = block.style;
            }
            block.version = hashFile(getStyleDir(dir, style)).slice(0, 10); // 10 should be more than enough for cache bust. 
            try {
                fs.writeFileSync(file, JSON.stringify(block));
              } catch (err) {
                console.error(err);
            }
        }       
    });
})

const readBlock = (file) => {
    return JSON.parse(fs.readFileSync(file));    
}

const hashFile = (file) => {
    const fileBuffer = fs.readFileSync(file);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

const getStyleDir = (path, style) => {
    const regex = /^file:./i;
    style = style.replace(regex, '');    
    return path + style;
}