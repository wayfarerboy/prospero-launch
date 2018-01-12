import { createModule } from 'redux-modules';
// import { carousels } from './content/data.js';

const menu = createModule({
  name: 'menu',
  initialState: {
    open: false,
  },
  selector: state => state,
  transformations: {
    open: {
      reducer: state => ({ ...state, open: true }),
    },
    close: {
      reducer: state => ({ ...state, open: false }),
    },
  },
});

export default { menu };
