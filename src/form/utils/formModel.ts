import { Schema, model } from 'mongoose';
import { ISchema } from '../../utils/cutomTypes';

export interface IForm extends ISchema {
  parentId: string;
  name: string;
  slug: string;
  fields: [IField];
  settings: any;
  published: boolean;
}

export interface IField {
  label: string;
  fieldType: string;
  typeId: any;
  options: any;
  form: any;
}

export const fieldSchema = new Schema({
  label: { type: String, required: true },
  fieldType: { type: String, required: true },
  typeId: {
    type: Schema.Types.ObjectId,
    ref: 'ListType',
  },
  options: {
    type: Schema.Types.Mixed,
    default: { mutipleValues: false },
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
  },
});

const formSchema = new Schema<IForm>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
    },
    name: { type: String, unique: true },
    slug: { type: String },
    fields: [fieldSchema],
    settings: {
      type: Schema.Types.Mixed,
      default: { mutipleResponses: false },
    },
    published: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const FormModel = model<IForm>('Form', formSchema);
