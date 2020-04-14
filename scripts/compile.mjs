import shell from 'shelljs';

export function build() {
  if (shell.exec('npm run build').code !== 0) {
    shell.exit(1);
  }
}
