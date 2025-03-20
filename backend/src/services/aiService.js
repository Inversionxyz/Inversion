const { Configuration, OpenAIApi } = require('openai');
const tf = require('@tensorflow/tfjs-node');

class AIService {
  constructor() {
    this.openai = null;
    this.predictionModel = null;
  }

  async initialize() {
    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);

    // Initialize TensorFlow model
    this.predictionModel = await this.loadPredictionModel();
  }

  async loadPredictionModel() {
    // Load or create TensorFlow model for future predictions
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));
    
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError'
    });

    return model;
  }

  async generateFutureDiary(userData, date) {
    const prompt = `Generate a detailed future diary entry for ${date} based on the following user data: ${JSON.stringify(userData)}`;
    
    const completion = await this.openai.createCompletion({
      model: "gpt-4",
      prompt: prompt,
      max_tokens: 1000
    });

    return completion.data.choices[0].text;
  }

  async predictFutureEvents(userData) {
    const userVector = this.preprocessUserData(userData);
    const prediction = await this.predictionModel.predict(userVector).array();
    return this.postprocessPrediction(prediction);
  }

  preprocessUserData(userData) {
    // Convert user data into tensor format
    return tf.tensor2d([userData.numericalFeatures]);
  }

  postprocessPrediction(prediction) {
    // Convert raw predictions into meaningful events
    return {
      events: prediction[0],
      confidence: prediction[1]
    };
  }
}

module.exports = new AIService(); 