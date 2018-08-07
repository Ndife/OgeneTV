exports.secretkey =()=>{
    var a = "z1a3qqhdkwgoidhdodsffemkjhgffe9oklbhdty67e289oernrjbiuhkd"
    b = a.length;
    h = []
    for(i=0; i<30; i++){
    g = Math.ceil(Math.random()*b);
    h.push(a.charAt(g));
    }
    return h.join('')
}
