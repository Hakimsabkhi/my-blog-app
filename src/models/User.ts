import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  role: 'Visitor' | 'Redacteur' | 'Admin';
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Visitor', 'Redacteur', 'Admin'], default: 'Visitor' },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
