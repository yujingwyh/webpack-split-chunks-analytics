import * as shell from 'shelljs';

//webpack打包
export function build() {
  if (shell.exec('npm run build').code !== 0) {
    shell.exit(1);
  }
}
