const uri = `
mongodb+srv://prorok26:prorok26@clusterbasic-fmzrp.mongodb.net/test
?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true
`;

const dbName = "medical_stats";
const collectionNames = new Map([
  ["aids_countries", { path: "./data/aids_hiv_countries.json" }],
  ["aids_regions", { path: "./data/aids_hiv_regions.json" }],
  ["life_expectancy_60_regions", { path: "./data/life_exp.json" }],
  [
    "life_expectancy_birth_regions",
    { path: "./data/healthy_life_exp_at_birth.json" },
  ],
  ["mortality_adult_countries", { path: "./data/mortality_rate.json" }],
  ["mortality_children_countries", { path: "./data/child_mortality.json" }],
  [
    "mortality_children_regions",
    { path: "./data/child_mortality_regions.json" },
  ],
]);

module.exports = {
  uri,
  dbName,
  collectionNames,
};
