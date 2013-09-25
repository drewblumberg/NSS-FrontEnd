var test_scores = [];
var num_scores = 10;
var score;
var sum = 0, sd_sum = 0;

for (i = 0; i < num_scores; i++)
{
  score = prompt('What is score #' + (i+1) + "?");
  score = parseFloat(score);
  test_scores.push(score);
  sum += score;
}

var mean = sum / num_scores;

for (k = 0; k < num_scores; k++)
{
  sd_sum += Math.pow((test_scores[k]-mean), 2);
}

var sd = Math.sqrt(sd_sum/num_scores);

console.log('The mean score is ' + mean + '.');
console.log('The standard deviation is ' + sd + '.');

