import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Delegue } from '../models/delegue';
import { Medecin } from '../models/medecin';
import { Visite } from '../models/visite';
import { TypeCadeau } from '../models/type-cadeau';
import { TypeFormation } from '../models/type-formation';
import { TypeRemboursement } from '../models/type-remboursement';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  apiURL: string = 'http://localhost/gsbsuiviact/';

  constructor(private http: HttpClient) { }

  public verifConnexion(ident: string, motdepasse: string): Observable<any> {
    const params = new HttpParams()
      .set('identifiant', ident)
      .set('motdepasse', motdepasse);
    return this.http.get<any>(this.apiURL + 'delegues', {params})
    .pipe(
      tap(res => console.log('connexion' + res)),
      catchError(this.handleError<any>('Verif connexion'))
    );
  }

  public getDelegueListe(): Observable<Delegue[]> {
    return this.http.get<Delegue[]>(this.apiURL + 'delegues')
    .pipe(
      tap(res => console.log('lecture des délégués OK' + res)),
      catchError(this.handleError<Delegue[]>('lecture des délégués', []))
    );
  }

  public getDelegue(id: string): Observable<Delegue>{
    return this.http.get<Delegue>(this.apiURL + 'delegues/' + id)
    .pipe(
      tap(res => console.log('lecture un délégué OK' + res)),
      catchError(this.handleError<Delegue>('Lire un délégué'))
    );
  }

  public getMedecinListe(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(this.apiURL + 'medecins')
    .pipe(
      tap(res => console.log('lecture des Médecin OK' + res)),
      catchError(this.handleError<Medecin[]>('lecture des Médecin', []))
    );
  }

  public getMedecin(id: string): Observable<Medecin>{
    return this.http.get<Medecin>(this.apiURL + 'medecins/' + id)
    .pipe(
      tap(res => console.log('lecture un medecin OK' + res)),
      catchError(this.handleError<Medecin>('Lire un medecin'))
    );
  }

  public getVisiteListe(id: string): Observable<Visite[]> {
    return this.http.get<Visite[]>(this.apiURL + 'visites/' + id)
    .pipe(
      tap(res => console.log('lecture des visites OK' + res)),
      catchError(this.handleError<Visite[]>('lecture des visites', []))
    );
  }

  public getTypeCadeauListe(): Observable<TypeCadeau[]> {
    return this.http.get<TypeCadeau[]>(this.apiURL + 'cadeau')
    .pipe(
      tap(res => console.log('lecture des Cadeau OK' + res)),
      catchError(this.handleError<TypeCadeau[]>('lecture des Cadeau', []))
    );
  }

  public getTypeFormationListe(): Observable<TypeFormation[]> {
    return this.http.get<TypeFormation[]>(this.apiURL + 'formation')
    .pipe(
      tap(res => console.log('lecture des formation OK' + res)),
      catchError(this.handleError<TypeFormation[]>('lecture des formation', []))
    );
  }

  public getTypeRemboursementListe(): Observable<TypeRemboursement[]> {
    return this.http.get<TypeRemboursement[]>(this.apiURL + 'remboursements')
    .pipe(
      tap(res => console.log('lecture des remboursement OK' + res)),
      catchError(this.handleError<TypeRemboursement[]>('lecture des remboursement', []))
    );
  }

  public handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} failed: ${error.message}');
      return of(result as T);
    }
  }
}
