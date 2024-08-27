function TypeOf(){
    var test = (
        <div>
            <marquee bgcolor="yellow" direction="up" height="100px">Hello</marquee>
            <marquee behavior="scroll" direction="up" scrollamount="1">Slow Scrolling</marquee>
            <marquee behavior="alternate" direction="right" scrollamount="12">Little Fast Scrolling</marquee>
            <marquee behavior="slide" direction="left" scrollamount="20">Fast Scrolling</marquee>
        </div>
    )
    console.log(test);
    return(
        <div>
            {test}
        </div>
    )
}
export default TypeOf;
