import {fragment, types} from 'typed-graphqlify';

const fields = {
  id:           types.number,
  parent_id:    types.number,
  name:         types.string,
};

export default fragment('PlaceFragment', 'Place', {
  ...fields,
  parent_names: types.string,
  parent: {
    ...fields,
    parent: {
      ...fields,
      parent: {
        ...fields,
      }
    }
  }
});