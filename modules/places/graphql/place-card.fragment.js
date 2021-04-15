import {fragment, types} from 'typed-graphqlify';

export default {
  place: fragment('PlaceFragment', 'Place', {
    id:           types.number,
    parent_id:    types.number,
    name:         types.string,
    parent_names: types.string,
  })
};