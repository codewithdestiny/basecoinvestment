import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, ObjectId, SchemaTypes } from "mongoose";


export type UserDocument = HydratedDocument<User>;


@Schema({collection: "Users", timestamps: true})
export class User extends Document{


    @Prop()
    firstName: String 

    @Prop()
    lastName: String;

    @Prop()
    password: String

    @Prop({type: String, trim: true, index: true, unique: true, sparse: true, lowercase: true})
    email: String

    @Prop({default: true, type: Boolean})
    isActive: Boolean

    @Prop({default: 0, type: Number})
    ethBal: Number

    @Prop({default: 0, type: Number})
    usdtBal: Number

    @Prop({type: String, trim: true, index: true, unique: true, sparse: true, lowercase: true})
    btcAddress: String;

    @Prop({type: String, trim: true, index: true, unique: true, sparse: true, lowercase: true})
    usdtAddress: String;

    @Prop({type: String, trim: true, index: true, unique: true, sparse: true, lowercase: true})
    ethAddrss: String;

    @Prop({type: String, trim: true, index: true, unique: true, sparse: true, lowercase: true})
    solAddress: String;

    @Prop({type: Number, default: '0'})
    amountDeposited: Number;

    @Prop({type: String})
    cryptoDeposited: String;

    @Prop({type: String})
    packagesDeposited: String

    @Prop({type: Number, default: 0})
    withdrawalAmt: Number

    @Prop({type: String, default: 'pending'})
    status: String

    @Prop({type: String})
    confirmationReceipt: String

    @Prop({default: 0, type: Number})
    btcBal: Number

    @Prop({default: 0, type: Number})
    solBal: Number

    @Prop({default: 0, type: Number})
    rateOfReturnInUsdt: Number

    @Prop({default: 0, type: Number})
    commissionBal: Number

    @Prop({default: false, type: Boolean})
    isAdmin: Boolean

}
export const UserSchema = SchemaFactory.createForClass(User);