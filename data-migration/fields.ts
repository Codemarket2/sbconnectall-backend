import ListType from '../src/list/utils/listTypeModel';
import Field from '../src/field/utils/fieldModel';
import { DB } from './db';

// await Field.updateMany({}, { position: 1 });

export const updatAllFieldPosition = async () => {
  const listTypes = await ListType.find();
  console.log('Total number of types', listTypes.length);
  for (let index = 0; index < listTypes.length; index++) {
    const listType = listTypes[index];
    console.log(`${index}) ${listType.title}`);
    await updatePosition(listType._id);
  }
};

const updatePosition = async (parentId: string) => {
  const fields = await Field.find({ parentId });
  for (let index = 0; index < fields.length; index++) {
    const field = fields[index];
    console.log(`     ${index + 1}) ${field.label}`);
    await Field.findByIdAndUpdate(field._id, { position: index + 1 });
  }
};

const runScript = async () => {
  try {
    await DB();
    await updatAllFieldPosition();
    process.exit();
  } catch (error) {
    console.log('Error', error);
  }
};

runScript();
