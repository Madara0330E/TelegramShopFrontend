

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
     
          <a className="text-2xl font-bold">MyLogo</a>
   
        <nav>
          <ul className="flex space-x-4">
            <li>
           
                <a className="hover:text-blue-300">Home</a>
             
            </li>
            <li>
          
                <a className="hover:text-blue-300">About</a>
             
            </li>
            <li>
          
                <a className="hover:text-blue-300">Contact</a>
             
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}