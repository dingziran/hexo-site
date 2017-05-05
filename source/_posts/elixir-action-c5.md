---
title: elixir_action_c5
date: 2016-06-28 23:04:08
tags:
  - Elixir
  - Language
categories:
  - Reading notes
thumbnail: /uploads/6165.jpg
---
## spawn

进程参数传递是深拷贝，因为进程之间不共享任何东西

```
//spawn process
pid=spawn(fn -> IO.puts("test") end)

//send message to process
send(pid,{:an,:arbitrary,:term})

//receiver
receive do
    pattern_1 -> do_something
    pattern_2 -> do_something_else
    after 5000 -> IO.puts "message not received"
end
```
![title](/uploads/elixir_action_c5_1.png)

The receive construct works as follows:
1. Take the first message from the mailbox
2. Try to match it against any of the provided pattern, from top to bottom
3. If a pattern matches the message, run the corresponding code
4. If no pattern matches, put the message back into the mailbox at the same position it originally occupied. Then try the next message.
5. If there are no more messages in the queue, wait for a new one to arrive. When a new message arrives, start from step 1, inspecting the first message in the message box.
6. If the after clause is specified and no message arrives in the given amount of time, run the code from the after block

## Server Process

```
defmodule DatabaseServer do
    def start do
        spawn(&loop/0)
    end
    defp loop do
        receive do
         ...
        end
        loop
    end
    ...
end
```

使用尾递归保持始终等待，并且不用担心消耗cpu，因为在等待的时候是挂起状态

## Process State

share state

```
def start do
    spawn(fn ->
        initial_state = ...
        loop(initial_state)
    end)
end

defp loop(state) do
    ...
    loop(state)
end
```

mutable state

```
def loop(state) do
    new_state = receive do
        msg1 ->
            ...
        msg2 ->
            ...
    end
    loop(new_state)
end
```

并且这里个receive的模式匹配建议使用函数重载，如

```
defp loop(current_value) do
    new_value = receieve do
        message ->
            process_message(current_value, message)
    end

    loop(new_value)    
end

defp process_message(current_value, pattern1) do
    ...
    value
end
defp process_message(current_value, pattern2) do
    ...
    value
end
```

## process register

```
Process.register(pid, alias)
```

alias must be an unique atom
