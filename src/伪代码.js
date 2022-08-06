/* eslint-disable */
    windows = x.split(window_size)
    x_mlp = mlp(x)
    for window in windows:
        attns=softmax(q_i*K_T/sqrt(d))V
        attnf = sigmoid(fc(cat(2DDCT(X_1)...2DDCT(X_n))))
        attn = a*attns + b * attnf
        res.append(attn)
    attn_mask = cat(res)
    x_res = resnet(x,attn_mask)
    result=cat(x_res,x_mlp)
    logits = fc(result)
