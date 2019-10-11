import {} from '../../services/mo'
import {
  postModule,
  patchModule,
  getModules,
  deleteModule,
} from '../../services/moduleServices';

const initialState = {
  array: [],
  noData: false,
  fetching: false,
  status: null,
};

/* CONSTANTS */
