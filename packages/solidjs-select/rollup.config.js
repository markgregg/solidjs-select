import withSolid from 'rollup-preset-solid';
import commonjs from '@rollup/plugin-commonjs';

export default withSolid({
  input: 'src/index.ts',
  targets: ['esm', 'cjs'],
  printInstructions: true,
  plugins: [commonjs()],
});
