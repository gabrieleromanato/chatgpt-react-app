<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

class APIController extends Controller
{
    public static function getResponse(string $text) : array {
        $url = 'https://api.openai.com/v1/chat/completions';
        $token = env('OPEN_AI_API_KEY');
        $data = [
            'model' => 'gpt-3.5-turbo',
            'messages' => [['role' => 'user', 'content' => $text]]
        ];
        $response = Http::withToken($token)->post($url, $data);
        if(!$response->successful()) {
            return ['error' => 'Request failed or timed out.'];
        }
        $body = $response->json();
        $answer = ['response' => ''];
        if(isset($body['choices']) && is_array($body['choices'])) {
            foreach ($body['choices'] as $choice) {
                if(isset($choice['message']) && isset($choice['message']['content'])) {
                    $answer['response'] .=  $choice['message']['content'];
                }
            }
        }
        return $answer;

    }
}
