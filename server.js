import moment from "moment-jalaali";
import random from "lodash/random";
import faker from "faker";
import {
  Server,
  createServer,
  RestSerializer,
  Model,
  hasMany,
  belongsTo,
  Response,
  Factory
} from "miragejs";

export function makeServer({environment = "development"} = {}) {
  const CATEGORIES = [
    "مسکن",
    "خوراک و خوار و بار",
    "حمل و نقل",
    "سلامت",
    "پوشاک",
    "بیمه",
    "پس انداز",
    "تفریح",
    "شخصی (آموزشی)",
    "مختلف"
  ];
  const START_DATE = moment("1399/08/01", "jYYYY/jMM/jDD")
    .startOf("day")
    .valueOf();
  return createServer({

    environment,
    models: {
      user: Model.extend({
        entries: hasMany()
      }),
      category: Model.extend({
        entries: hasMany()
      }),
      entry: Model.extend({
        user: belongsTo(),
        category: belongsTo()
      })
    },
    serializers: {
      application: RestSerializer.extend({
        embed: true
      }),
      user: RestSerializer.extend({
        root: false,
        embed: true,
        attrs: ["id", "name", "userName"],
        include: ["entries"]
      }),
      category: RestSerializer.extend({
        root: false,
        embed: true
        // include: ["entries"]
      }),
      entry: RestSerializer.extend({
        root: false,
        embed: true,
        include: ["category"]
      })
    },
    factories: {
      user: Factory.extend({
        name() {
          faker.locale = "fa";
          return faker.name.findName(
            faker.name.firstName(),
            faker.name.lastName()
          );
        },
        userName() {
          faker.locale = "en";
          return faker.internet.userName();
        },
        password: "123456"
      }),
      category: Factory.extend({
        name(i) {
          return CATEGORIES[i % 10];
          //yani yeki yeki bar asase array chapesh kon
        }
      }),
      entry: Factory.extend({
        title() {
          faker.locale = "fa";
          return faker.random.words();
        }
      })
    },
    seeds(server) {
      //yani 10 ta azash ijad kon
      const categories = server.createList("category", 10);
      server.createList("user", 5).forEach(user => {
        server.createList("entry", 20, {user}).forEach(entry =>
          entry.update({
            category: categories[Math.floor(Math.random() * 1000) % 10],
            amount: faker.random.number(),
            date: moment(START_DATE).add(random(29), "days").valueOf()
          })
        );
      });
    },
    routes() {
      this.post("/auth/login", (schema, request) => {
        const {userName, password} = JSON.parse(request.requestBody);
        const user = schema.users.findBy({userName: userName, password});
        if (!!user) {
          return new Response(200, {}, {user, token: generateToken(user)});
        }
        return new Response(
          404,
          {},
          {message: "نام کاربری یا رمزعبور اشتباه است"}
        );
      });

      this.post("/auth/register", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const user = schema.users.create(body);
        return new Response(201, {}, {user, token: generateToken(user)});
       
      });

      this.get("/auth/test", (schema, request) => {
        // return { token: request.requestHeaders.token };
        const JSONStr = decodeURIComponent(
          window.atob(request.requestHeaders.token)
        );
        return JSON.parse(JSONStr);
      });

      // this.namespace = "api";
      // this.resource("users");
      // this.resource("categories");
      // this.resource("entries");

      this.get("/api/categories", (schema, request) => {
        return schema.categories.all();
      });

      this.post("/api/categories/delete", (schema, request) => {
        const {categoryId} = request.queryParams;
        const category = schema.db.categories.find(categoryId);
        schema.db.categories.remove(category);
        // schema.db.categories.save();
        return new Response(201);
      });

      this.post("/api/categories/edit", (schema, request) => {
        const {categoryId} = request.queryParams;
        const category = schema.categories.find(categoryId);
        const body = JSON.parse(request.requestBody);
        category.update(body);
        return new Response(201, {}, category);
      });

      this.post("/api/categories", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const user = schema.categories.create(body);
        return new Response(201, {}, user);
      });

      this.get("/api/users", (schema, request) => {
        return schema.users.all();
      });
      this.post("/api/users/delete", (schema, request) => {
        const {userId} = request.queryParams;
        const user = schema.db.users.find(userId);
        schema.db.users.remove(user);
        // schema.db.categories.save();
        return new Response(201);
      });

      this.post("/api/users/edit", (schema, request) => {
        const {userId} = request.queryParams;
        const user = schema.users.find(userId);
        const body = JSON.parse(request.requestBody);
        user.update(body);
        return new Response(201, {}, user);
      });

      this.post("/api/users", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const user = schema.users.create(body);
        return new Response(201, {}, user);
      });


      this.get("/api/entries", (schema, request) => {
        const {timestamp, categoryId, userId} = request.queryParams;
        let filter = {};
        if (categoryId && categoryId > 0) {
          filter = {...filter, categoryId: categoryId};
        }
        if (userId && userId > 0) {
          filter = {...filter, userId: userId};
        }
        if (timestamp && timestamp > 0) {
          const date = moment(+timestamp);
          return schema.entries.where(filter).filter(entry => date.isSame(entry.date, "day"));
        } else {
          return schema.entries.where(filter);
        }
      });
    }
  });

  function generateToken(user) {
    return window.btoa(encodeURIComponent(JSON.stringify(user)));
  }
}

