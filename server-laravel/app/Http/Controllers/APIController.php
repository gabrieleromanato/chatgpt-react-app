<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redis;

class APIController extends Controller
{
    public static function getResponse(string $text) : array {
        $answer = ['response' => ''];
        $cached_answer = Redis::get($text);
        if($cached_answer) {
            $answer['response'] = $cached_answer;
            return $answer;
        }
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

        if(isset($body['choices']) && is_array($body['choices'])) {
            foreach ($body['choices'] as $choice) {
                if(isset($choice['message']) && isset($choice['message']['content'])) {
                    $answer['response'] .=  $choice['message']['content'];
                }
            }
        }
        Redis::set($text, $answer['response']);
        return $answer;

    }
}
