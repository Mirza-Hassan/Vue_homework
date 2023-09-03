  <template>
    <div class="App">
      <div class="quiz-container">
        <h1 class="quiz-title">Weather Quiz</h1>
        <template v-if="loading">
          <div class="loading">Loading...</div>
        </template>
        <template v-else>
          <template v-if="!quizCompleted">
            <p class="question">{{ questions[questionIndex]?.question }}</p>
            <div class="options">
              <label
                v-for="(option, index) in questions[questionIndex]?.options"
                :key="index"
                class="option-label"
              >
                <input
                  type="radio"
                  name="options"
                  :value="option"
                  :checked="selectedOption === option"
                  @change="handleOptionClick(option)"
                />
                {{ option }}
              </label>
            </div>
            <button class="next-btn" @click="handleNextQuestion">
            {{ questionIndex + 1 === questions.length ? 'Finish' : 'Next Question' }}
            </button>
            <div v-if="alertMessage" class="alert-message">{{ alertMessage }}</div>
          </template>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questionIndex: 0,
        questions: [],
        selectedOption: '',
        quizCompleted: false,
        loading: true,
        weatherData: null,
        alertMessage: ''
      };
    },
    async created() {
      await this.fetchWeatherData();
      this.generateQuestions();
      this.loading = false;
    },
    methods: {
      async fetchWeatherData() {
        try {
          const response = await fetch('http://localhost:3000/api/weather?city=London');
          this.weatherData = await response.json();
        } catch (error) {
          // Error fetching weather data
        }
      },
      generateQuestions() {
        const fetchedQuestions = [
          {
            question: `What is the weather condition in ${this.weatherData?.name} today?`,
            options: ['Sunny', 'Clouds', 'Rainy', 'Snowy'],
            correctAnswer: this.weatherData?.weather?.[0]?.main
          },
          {
            question: `What is the temperature in ${this.weatherData?.name} right now (in Celsius)?`,
            options: [`${Math.round(this.weatherData?.main?.temp)}°C`, '10°C', '20°C', '30°C'],
            correctAnswer: `${Math.round(this.weatherData?.main?.temp)}°C`
          },
          {
            question: `What is the humidity level in ${this.weatherData?.name} right now?`,
            options: [`${this.weatherData?.main?.humidity}%`, '50%', '75%', '90%'],
            correctAnswer: `${this.weatherData?.main?.humidity}%`
          },
        ];
  
        this.questions = fetchedQuestions;
      },
      handleOptionClick(option) {
        this.selectedOption = option;
      },
      handleNextQuestion() {
        if (!this.selectedOption) {
          this.showAlertMessage('Please select an option.');
          return;
        }
  
        if (this.selectedOption === this.questions[this.questionIndex].correctAnswer) {
          this.showAlertMessage('Correct!', 'success');
        } else {
          this.showAlertMessage(
          'Incorrect. The correct answer is ' + this.questions[this.questionIndex].correctAnswer,
          'error'
        );
        }
        if (this.questionIndex + 1 < this.questions.length) {
          this.questionIndex++;
          this.selectedOption = '';
        }
      },
      showAlertMessage(message) {
      this.alertMessage = message;
      setTimeout(() => {
        this.alertMessage = '';
      }, 3000);
    }
    }
  };
  </script>
  
  <style scoped>
  .App {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
  }
  
  .quiz-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
  
  .quiz-title {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .loading {
    margin-top: 20px;
  }
  
  .question {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .options {
    margin-bottom: 20px;
  }
  
  .option-label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .next-btn {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .next-btn:hover {
    background-color: #0056b3;
  }
  
 .alert-message {
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #8ecff5;
  color: #000000;
}  

</style>
  