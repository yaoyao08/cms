const Koa = require("koa");
const app = new Koa();
const items = [
  { id: 1, title: "title1" },
  { id: 2, title: "title2" },
];

app.use(async (ctx, next) => {
  if (ctx.path === "/api/jsonp") {
    const { callback, id } = ctx.query;
    const title = items.find((item) => item.id == id)["title"];
    ctx.body = `${callback}(${JSON.stringify({ title })})`;
    return;
  }
});
console.log("listen 8080...");
app.listen(8080);

export class PlayBoy {
  constructor(name) {
    this.name = name;
    this.pools = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }
  sayHi() {
    const fn = () => {
      console.log(`大家好我是${this.name}`);
      this.next();
    };
    this.pools.push(fn);
    return this;
  }
  sleep(timeout) {
    const fn = () => {
      setTimeout(() => {
        console.log(`${timeout / 1000}s之后`);
        this.next();
      }, timeout);
    };
    this.pools.push(fn);
    return this;
  }
  play(game) {
    const fn = () => {
      console.log(game);
      this.next();
    };
    this.pools.push(fn);
    return this;
  }
  next() {
    const fn = this.pools.shift();
    fn && fn();
  }
}
