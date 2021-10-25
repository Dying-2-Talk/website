import esbuild from 'rollup-plugin-esbuild';

export default [{
  input: 'src/component/index.ts',
  plugins: [
    esbuild({
      target: 'esnext'
    })
  ],
  output: [{
    file: 'dist/component.js',
    exports: 'auto',
    format: 'iife',
  }]
}];
