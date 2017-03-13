# gtrace/hapi/h2o2 issue

## Running

```
npm install
npm start
```

To run without tracing;

```
SKIP_TRACE=1 npm start
```

## Output without tracing (expected)

```
[service 2] listening on port 4001
[service 1] listening on port 4000
[master] requesting random number
[service 2] delivering random number
[master] response: {"number":0.49960384878069153,"from":"service 2"}
[service 2] shutting down
[service 1] shutting down
```

## Output with tracing

```
[service 2] listening on port 4001
[service 1] listening on port 4000
[master] requesting random number
[service 2] delivering random number
[master] response: ""
[service 2] shutting down
[service 1] shutting down
```

