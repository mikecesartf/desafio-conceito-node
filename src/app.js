const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoriesIndex = repositories.findIndex(repositories => repositories.id == id);

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: ' Repositories not Found.' })
  }

  const repositories = {
    title,
    url,
    techs,
  };

  repositories[repositoriesIndex] = repositories;

  return response.json(repositories);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repositories => repositories.id == id);

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: ' Repositories not Found.' })
  }

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repositories => repositories.id == id);

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: ' Repositories not Found.' })
  }

  const { likes: qtd, title, url, techs } = repositories[repositoriesIndex]
  const likes = qtd + 1

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[repositoriesIndex] = repository;

  return response.json(repository);

}
);

module.exports = app;
