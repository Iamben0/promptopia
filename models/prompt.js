import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	prompt: {
		type: String,
		required: [true, 'Prompt is required'],
	},
	tag: {
		type: String,
		required: [true, 'Tag is required'],
	},
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);
// models.Prompt -> get the prompt that already exists on the models object
// model('Prompt', PromptSchema); -> if doesn't exist, create a new model called 'Prompt' based on the PromptSchema

export default Prompt;
