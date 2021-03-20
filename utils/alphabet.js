import forEach from 'lodash/forEach';

/**
 * @param items
 * @param paramName
 */
const alphabet = (items, paramName = 'name') => {
  let memory = null, newItems = {};

  forEach(items, (item, key) => {
    // Получаем первую букву
    let letter = item[paramName].charAt(0).toUpperCase();

    // Если текущая буква не равна предыдущей
    if( letter !== memory )
    {
      // Заносим букву в "память"
      memory = letter;

      // Добавляем новый массив
      newItems[memory] = {};
    }

    // Дополняем массив
    newItems[memory][key] = item;
  });

  return newItems;
};

export default alphabet;
