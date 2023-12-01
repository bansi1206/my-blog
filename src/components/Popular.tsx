"use client";

type Props = {};

export const Popular: React.FC<Props> = () => {
  return (
    <div>
      <div className="container">
        <div className="flex flex-col gap-y-7">
          <h4>POPULAR POSTS</h4>
          <ul className="list-none p-0 flex flex-col gap-y-5 w-[320px]">
            <li>
              How To Have Your Cake and Eat It Too: The Way of The Chicken Man
            </li>
            <li>My Grandma's 30-year-old Recipe</li>
            <li>What I learned about cooking from Ratatoulie</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
