<?php
namespace App\Http\Controllers;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\APIController;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'question']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);
        if (! $token = auth()->attempt($validated)) {
            return response()->json(['error' => 'Invalid login.']);
        }
        return $this->createNewToken($token);
    }

    public function question(Request $request) {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'Invalid request.']);
            }
            $question = $request->input('question');
            if (!$question) {
                return response()->json(['error' => 'Invalid request.']);
            }
            $answer = APIController::getResponse($question);
            return response()->json($answer);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid request.']);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'token' => $token
        ]);
    }
}
