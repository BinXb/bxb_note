<!--  -->

# Promise

## 方法

> Promise.all()
>
> Promise.race()
>
> Promise.allSettled()

### .all 方法

Promise.all(promises)

.all 方法可以将需要执行的多个 promise 封装成一个 promise 对象，通过`.all`方法处理

```js
let promises = [promise1, promise2, promise3];
Promise.all(promises);
```

同时也可以使用 promise 搭配的`.then`方法来进行下一步操作

```js
let promises = [promise1, promise2, promise3];
Promise.all(promises).then((resArr) => {
  assert.deepEqual(arr, [promise1, promise2, promise3]);
});
```

同时也可以使用 catch 来捕获错误信息

```js
let promises = [promise1, promise2, promise3];
Promise.all(promises)
  .then((resArr) => {
    // 事实上，arr表示promise方法，[]数组中是对应方法的参数。 - Api
    // 使用assert.deepEqual()方法进行递归调用赋值 - 参数
    assert.deepEqual(arr, [promise1, promise2, promise3]);
  })
  .catch((err) => {
    assert.equal(err, "ERROR");
  });
```
