import { Link } from "react-router-dom";

const FrontPage = () => {
    return (
        <div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <h1 className="font-serif text-7xl uppercase text-center mb-4 ">well come in our site</h1>
                <div className="hidden sm:mb-8 sm:flex sm:justify-center ">
                    <div className="relative rounded-full  px-8 py-2  text-lg leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        please create a account.{' '}
                        <Link to='/register' className="font-semibold text-indigo-600">
                            <span className="absolute inset-0" aria-hidden="true" />
                            Register <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;