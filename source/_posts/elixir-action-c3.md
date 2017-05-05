---
title: elixir_action_c3
date: 2016-05-15 14:20:23
tags:
  - Elixir
  - Language
categories:
  - Reading notes
thumbnail: /uploads/1197.jpg
---

## matching with "="
```
{name, age} = {"Bob",25}
```
如果1=1不合法，则=符号是赋值
如果1=1合法，则=符号是模式匹配
所以上边的代码在elixir中是模式匹配，在javascript中是解构

如果匹配左侧需要匹配变量值，而不是语义值，则需要使用^符号,有点类型c语言的&符号
```
name="Bob"
{^name,age} = {"Alice", 25}
//throw MatchError
```
matching with aggregation
```
[head | tail] = [1,2,3]
"ping " <> url = "ping www.example.com"
```
matching map, partial-matching
```
%{age: age} = %{name: "Bob", age: 25}
```
compound matching
```
datetime = {_, {hour, _, _}} = :calender.local_time
```
## matching with function
```
def area({a, b}) do
    a * b
end
```
multiclause function
```
defmodule Geometry do
    def area({:rectangle, a, b}) do
        a*b
    end
    def area({:square, a}) do
        a*a
    end
    def area({:circle, r}) do
        r * r * 3.14
    end
end
```
guard
```
def area({a, b}) when a>0 && b>0 do
    a * b
end
```
