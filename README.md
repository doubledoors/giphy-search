# Giphy Search!
## By Ben Sharp for zZish.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

###### Installation
cd into here (giphy-search)
npm install
npm start
..
should popup at localhost:3000

###### Design choices
When first reading the spec I began thinking about how to break it down into it's various components.
From my learning about React I know it's good practice to try to have 1 'Smart' component and the rest 'Dumb' or stateless, particularly in a simple SPA like this one.
So I decided to have the App component manage state, and conditionally render the child components (GifDetail and Pagination). All the child components would be 
written as stateless functional components, only rendering the props they are given by App. This make them nice and resuable should the app ever scale or we port them over
to a new project etc.

In terms of layout and design, I've mostly followed your spec guidelines. While very quickly jumping into Google Material design for a colour scheme. I decided to go with a dark theme as it just makes viewing the media easier on the eyes. My mobile styles are super simple and would need some more work given the time. For now I've simply display: none'd the GifDetail modal popup as I wasn't sure what to do with that for mobile yet.

I've imported good old font-awesome for icons.

###### How far I got
I recieved the spec on Monday and so I've really been thinking about this a lot over the week. At work, at home, on the bus etc. I've been drawing it out and writing down the props I'd need and read the API in my spare time (is that cheating??). This made the coding of it obviously much easier. It has taken me over 2 hours to build, but not by much. It's coming in at the 2.5 hour mark. I can't stop fiddling with styling.
I've managed to implement every component I set out to create, although the Pagination component needs work. Currently it's paginating but will run past the total page count and also past zero. You can sometimes see NaN render in the Pagination__display which I would need to look at.
Gif and GifDetail are two very simple components that just render their props. I cannot for the life of me find a gifObject in the api response that contains a 'title' key! (Maybe I am missing something here?) So every GifDetail will just render it's defaultProp of 'Title' unfortunately. 
Currently there is no preloading or graceful handling of the gifs as they load. They all just load in as they come down through the network and it's really ugly. I would need work on that.
I need to wrap the search input in a form and add a submit button. My main focus was on getting the query happening as you type (for bonus points) so haven't gotten around to that yet.
Any original src gif that's extremely large and gets loaded into a GifDetail component will push down and create scroll bars. That needs looking at too.
Lastly, testing. I haven't written any tests for this at all. Although I would like to, it's just not something I know enough about yet. I think I'll use this build as an opportunity however. Maybe over the weekend if I can find the time.

###### All in all
As far as tests go this was by far the most fun I've had! You picked a fantastic API to work with (although it's far too distracting, I wasted time searching absolutle nonsense in that input field). 
It's also a React build and I just love this framework. It's been great working with it again. I'm quietly pleased with how it's turned out. Although it could look better and still needs work. I will definitely be adding to this. Maybe hooking it into Meteor to get some user accounts in there. Favorites, share links etc.

So, thanks! Had lots of fun.
Look forward to talking with you about it.

All the best,
Ben